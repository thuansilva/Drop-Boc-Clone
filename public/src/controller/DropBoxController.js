class DropBoxController {
  constructor() {
    this.btnSendFileE1 = document.querySelector("#btn-send-file");
    this.inputFileE1 = document.querySelector("#files");
    this.snackModalEl = document.querySelector("#react-snackbar-root");
    this.progressBarl = this.snackModalEl.querySelector(".mc-progress-bar-fg");
    this.nameFileEl = this.snackModalEl.querySelector(".filename");
    this.timeleftEl = this.snackModalEl.querySelector(".timeleft");

    this.initEvents();
  }
  initEvents() {
    this.btnSendFileE1.addEventListener("click", (event) => {
      this.inputFileE1.click();
    });
    this.inputFileE1.addEventListener("change", (event) => {
      this.uploadTasks(event.target.files);
      this.modalShow();
      this.inputFileE1.value = "";
    });
  }
  modalShow(show = true) {
    this.snackModalEl.style.display = show ? "block" : "none";
  }

  uploadTasks(files) {
    let promises = [];
    [...files].forEach((file) => {
      promises.push(
        new Promise((resolve, reject) => {
          let ajax = new XMLHttpRequest();
          ajax.open("POST", "/upload");
          //pra verificar se foi realizado o upload
          ajax.onload = (event) => {
            this.modalShow(false);
            try {
              resolve(JSON.parse(ajax.responseText));
            } catch (error) {
              reject(error);
            }
          };
          ajax.onerror = (event) => {
            this.modalShow(false);
            reject(event);
          };

          ajax.upload.onprogress = (event) => {
            this.uploadProgress(event, file);
          };
          let formData = new FormData();
          formData.append("input-file", file);
          this.startUploadTime = Date.now();
          ajax.send(formData);
        })
      );
    });
    return Promise.all(promises);
  }

  uploadProgress(event, file) {
    let timeSpant = Date.now() - this.startUploadTime;
    let loaded = event.loaded;
    let total = event.total;
    let porcent = parseInt((loaded / total) * 100);
    let timeleft = ((100 - porcent) * timeSpant) / porcent;
    this.progressBarl.style.width = `${porcent}%`;
    this.nameFileEl.innerHTML = file.name;
    this.timeleftEl.innerHTML = this.formatTimeToHuman(timeleft);
  }
  formatTimeToHuman(duration) {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    if (hours > 0) {
      return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
    }
    if (minutes > 0) {
      return `${minutes} minutos e ${seconds} segundos`;
    }
    if (seconds > 0) {
      return `${seconds} segundos`;
    }
    return "0";
  }
}

// primeiro cria um variavel para receber os files, eses files podem conter um ou mais arquivos

// depois abro uma conexão usando XMLHttpRequest.
// com o open eu digo qual o metodo e qual a rota que vai executar esses MediaStreamAudioDestinationNode

// o onload e executado quando a request é concluida com sucesso
