class DropBoxController {
  constructor() {
    this.btnSendFileE1 = document.querySelector("#btn-send-file");
    this.inputFileE1 = document.querySelector("#files");
    this.snackModalEl = document.querySelector("#react-snackbar-root");
    this.initEvents();
  }
  initEvents() {
    this.btnSendFileE1.addEventListener("click", (event) => {
      this.inputFileE1.click();
    });
    this.inputFileE1.addEventListener("change", (event) => {
      console.log(event.target.files);
      this.uploadTasks(event.target.files);
      this.snackModalEl.style.display = "block";
    });
  }

  uploadTasks(files) {
    let promises = [];
    [...files].forEach((file) => {
      promises.push(
        new Promise((resolve, reject) => {
          let ajax = new XMLHttpRequest();
          ajax.open("POST", "/upload");
          //pra verificar se foi realizado o upload
          ajax.onload = function (event) {
            try {
              resolve(JSON.parse(ajax.responseText));
            } catch (error) {
              reject(error);
            }
          };
          ajax.onerror = function (event) {
            reject(event);
          };
          let formData = new FormData();
          formData.append("input-file", file);
          ajax.send(formData);
        })
      );
    });
    return Promise.all(promises);
  }
}

// primeiro cria um variavel para receber os files, eses files podem conter um ou mais arquivos

// depois abro uma conexão usando XMLHttpRequest.
// com o open eu digo qual o metodo e qual a rota que vai executar esses MediaStreamAudioDestinationNode

// o onload e executado quando a request é concluida com sucesso
