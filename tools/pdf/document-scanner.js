import '../../js/pdf/pdf-main.js';

const $ = (selector) => document.querySelector(selector);
const pages = [];
let stream = null, facingMode = 'environment', cropper = null, cropIndex = -1, dragIndex = -1;
const input = $('#photo-input'), grid = $('#page-grid'), editor = $('#editor-panel'), capture = $('#capture-panel');
const cameraDialog = $('#camera-dialog'), cropDialog = $('#crop-dialog'), video = $('#camera-video');

$('#choose-photos').addEventListener('click', () => input.click());
$('#add-more').addEventListener('click', () => input.click());
input.addEventListener('change', (event) => addFiles(event.target.files));
$('#open-camera').addEventListener('click', openCamera);
$('#camera-more').addEventListener('click', openCamera);
$('#take-photo').addEventListener('click', capturePhoto);
$('#switch-camera').addEventListener('click', async () => { facingMode = facingMode === 'environment' ? 'user' : 'environment'; await startCamera(); });
$('#create-pdf').addEventListener('click', createPdf);
$('#apply-crop').addEventListener('click', applyCrop);
document.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', () => closeDialog(button.dataset.close)));
cameraDialog.addEventListener('close', stopCamera);
cropDialog.addEventListener('close', destroyCropper);

const drop = $('#scanner-drop');
['dragenter', 'dragover'].forEach((name) => drop.addEventListener(name, (event) => { event.preventDefault(); drop.classList.add('dragover'); }));
['dragleave', 'drop'].forEach((name) => drop.addEventListener(name, (event) => { event.preventDefault(); drop.classList.remove('dragover'); }));
drop.addEventListener('drop', (event) => addFiles(event.dataTransfer.files));
drop.addEventListener('click', () => input.click());
drop.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') input.click(); });

async function addFiles(fileList) {
  const images = [...fileList].filter((file) => file.type.startsWith('image/'));
  if (!images.length) return window.Utils.showToast('Choose one or more image files.', 'error');
  for (const file of images) {
    try { pages.push(await fileToPage(file)); }
    catch { window.Utils.showToast(`Could not read ${file.name}.`, 'error'); }
  }
  input.value = '';
  renderPages();
}

function fileToPage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => loadImage(reader.result).then((image) => resolve({ name: file.name, source: reader.result, rotation: 0, filter: 'original', width: image.naturalWidth, height: image.naturalHeight })).catch(reject);
    reader.readAsDataURL(file);
  });
}
function loadImage(source) { return new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = source; }); }

async function openCamera() {
  if (!navigator.mediaDevices?.getUserMedia) return window.Utils.showToast('Camera access is not supported in this browser.', 'error');
  cameraDialog.showModal();
  await startCamera();
}
async function startCamera() {
  stopCamera();
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: facingMode }, width: { ideal: 1920 }, height: { ideal: 1440 } }, audio: false });
    video.srcObject = stream;
    await video.play();
  } catch (error) {
    closeDialog('camera-dialog');
    window.Utils.showToast(error.name === 'NotAllowedError' ? 'Camera permission was not granted.' : 'Could not start the camera.', 'error');
  }
}
function stopCamera() { if (stream) stream.getTracks().forEach((track) => track.stop()); stream = null; video.srcObject = null; }
function capturePhoto() {
  if (!video.videoWidth) return;
  const canvas = $('#camera-canvas'); canvas.width = video.videoWidth; canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  pages.push({ name: `Scan ${pages.length + 1}`, source: canvas.toDataURL('image/jpeg', .94), rotation: 0, filter: 'enhance', width: canvas.width, height: canvas.height });
  $('#camera-tally').textContent = `${pages.length} captured`;
  renderPages();
  window.Utils.showToast('Page captured.', 'success');
}

function renderPages() {
  grid.replaceChildren();
  pages.forEach((page, index) => {
    const item = document.createElement('article'); item.className = 'scan-page'; item.draggable = true;
    const preview = document.createElement('div'); preview.className = 'page-preview';
    const canvas = document.createElement('canvas'); preview.appendChild(canvas);
    const number = document.createElement('span'); number.className = 'page-number'; number.textContent = index + 1; item.append(number, preview); drawPage(canvas, page, 700);
    const tools = document.createElement('div'); tools.className = 'page-tools';
    tools.append(toolButton('fa-crop-simple', 'Crop', () => openCrop(index)), toolButton('fa-rotate-right', 'Rotate right', () => rotatePage(index, 90)), toolButton('fa-clone', 'Duplicate', () => duplicatePage(index)), toolButton('fa-trash', 'Delete', () => deletePage(index)));
    const filter = document.createElement('select'); filter.className = 'page-filter'; filter.setAttribute('aria-label', `Filter page ${index + 1}`);
    [['original','Original'],['enhance','Enhance'],['grayscale','Grayscale'],['bw','Black & white']].forEach(([value,label]) => filter.add(new Option(label, value, false, page.filter === value)));
    filter.addEventListener('change', () => { page.filter = filter.value; drawPage(canvas, page, 700); }); item.append(tools, filter);
    item.addEventListener('dragstart', () => { dragIndex = index; item.classList.add('dragging'); });
    item.addEventListener('dragend', () => { dragIndex = -1; item.classList.remove('dragging'); document.querySelectorAll('.drag-target').forEach((node) => node.classList.remove('drag-target')); });
    item.addEventListener('dragover', (event) => { event.preventDefault(); item.classList.add('drag-target'); }); item.addEventListener('dragleave', () => item.classList.remove('drag-target'));
    item.addEventListener('drop', (event) => { event.preventDefault(); if (dragIndex < 0 || dragIndex === index) return; const [moved] = pages.splice(dragIndex, 1); pages.splice(index, 0, moved); renderPages(); });
    grid.appendChild(item);
  });
  const hasPages = pages.length > 0; editor.hidden = !hasPages; capture.hidden = hasPages;
  $('#page-count').textContent = pages.length; $('#camera-tally').textContent = `${pages.length} captured`; setStep(hasPages ? 'edit' : 'capture');
}

function toolButton(icon, label, callback) { const button = document.createElement('button'); button.type = 'button'; button.title = label; button.setAttribute('aria-label', label); button.innerHTML = `<i class="fas ${icon}"></i>`; button.addEventListener('click', callback); return button; }
function rotatePage(index, amount) { pages[index].rotation = (pages[index].rotation + amount) % 360; renderPages(); }
function duplicatePage(index) { pages.splice(index + 1, 0, { ...pages[index], name: `${pages[index].name} copy` }); renderPages(); }
function deletePage(index) { pages.splice(index, 1); renderPages(); }

async function drawPage(canvas, page, maxDimension = 1600) {
  const image = await loadImage(page.source), swap = page.rotation % 180 !== 0;
  const originalWidth = swap ? image.naturalHeight : image.naturalWidth, originalHeight = swap ? image.naturalWidth : image.naturalHeight;
  const scale = Math.min(1, maxDimension / Math.max(originalWidth, originalHeight));
  canvas.width = Math.max(1, Math.round(originalWidth * scale)); canvas.height = Math.max(1, Math.round(originalHeight * scale));
  const context = canvas.getContext('2d'); context.save(); context.translate(canvas.width / 2, canvas.height / 2); context.rotate(page.rotation * Math.PI / 180); context.filter = filterValue(page.filter);
  context.drawImage(image, -image.naturalWidth * scale / 2, -image.naturalHeight * scale / 2, image.naturalWidth * scale, image.naturalHeight * scale); context.restore();
  if (page.filter === 'bw') applyThreshold(context, canvas.width, canvas.height);
}
function filterValue(filter) { if (filter === 'enhance') return 'contrast(1.22) brightness(1.08) saturate(.75)'; if (filter === 'grayscale' || filter === 'bw') return 'grayscale(1) contrast(1.15)'; return 'none'; }
function applyThreshold(context, width, height) { const image = context.getImageData(0, 0, width, height); for (let i = 0; i < image.data.length; i += 4) { const value = image.data[i] > 174 ? 255 : 0; image.data[i] = image.data[i + 1] = image.data[i + 2] = value; } context.putImageData(image, 0, 0); }

function openCrop(index) {
  cropIndex = index; const cropImage = $('#crop-image'); cropImage.src = pages[index].source; cropDialog.showModal();
  cropImage.onload = () => { destroyCropper(); cropper = new Cropper(cropImage, { viewMode: 1, autoCropArea: .92, background: false, responsive: true }); };
}
function destroyCropper() { if (cropper) cropper.destroy(); cropper = null; }
function applyCrop() {
  if (!cropper || cropIndex < 0) return;
  const canvas = cropper.getCroppedCanvas({ maxWidth: 2200, maxHeight: 2200, imageSmoothingQuality: 'high' });
  pages[cropIndex].source = canvas.toDataURL('image/jpeg', .94); pages[cropIndex].width = canvas.width; pages[cropIndex].height = canvas.height; pages[cropIndex].rotation = 0;
  cropDialog.close(); renderPages();
}
function closeDialog(id) { const dialog = document.getElementById(id); if (dialog.open) dialog.close(); }
function setStep(name) { document.querySelectorAll('.stepper .step').forEach((step) => step.classList.toggle('active', step.dataset.step === name)); }

async function createPdf() {
  if (!pages.length) return;
  const overlay = $('#busy-overlay'); overlay.hidden = false; setStep('export');
  try {
    const pdf = await PDFLib.PDFDocument.create(), quality = Number($('#image-quality').value), margin = Number($('#page-margin').value), format = $('#page-size').value;
    for (let index = 0; index < pages.length; index++) {
      $('#busy-page').textContent = `${index + 1} of ${pages.length}`;
      const canvas = document.createElement('canvas'); await drawPage(canvas, pages[index], quality > .9 ? 2400 : quality > .8 ? 1900 : 1400);
      const bytes = await (await fetch(canvas.toDataURL('image/jpeg', quality))).arrayBuffer(), embedded = await pdf.embedJpg(bytes);
      const fixed = format === 'a4' ? [595.28, 841.89] : format === 'letter' ? [612, 792] : null;
      let pageWidth = fixed?.[0] || embedded.width, pageHeight = fixed?.[1] || embedded.height;
      if (fixed && embedded.width > embedded.height) [pageWidth, pageHeight] = [fixed[1], fixed[0]];
      const page = pdf.addPage([pageWidth, pageHeight]), scale = Math.min((pageWidth - margin * 2) / embedded.width, (pageHeight - margin * 2) / embedded.height), width = embedded.width * scale, height = embedded.height * scale;
      page.drawImage(embedded, { x: (pageWidth - width) / 2, y: (pageHeight - height) / 2, width, height });
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    pdf.setTitle($('#doc-name').value.trim() || 'Scanned document'); pdf.setCreator('Vibox Document Scanner');
    const blob = new Blob([await pdf.save()], { type: 'application/pdf' }), safeName = ($('#doc-name').value.trim() || 'Scanned document').replace(/[\\/:*?"<>|]+/g, '-');
    window.Utils.downloadBlob(blob, `${safeName}.pdf`); window.Utils.showToast('PDF created successfully.', 'success');
  } catch (error) { console.error(error); window.Utils.showToast('Could not create the PDF. Try fewer or smaller images.', 'error'); }
  finally { overlay.hidden = true; setStep('edit'); }
}
