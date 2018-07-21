// Yes, I know there's this thing called git.
// Still, it's more comfortable to stash stuff here than combing through version history...

  // transpile = (): Promise<EmitOutput> => {
  //   let model = this.editor.getModel();
  //   return new Promise(resolve => {
  //     monaco.languages.typescript.getTypeScriptWorker()
  //       .then(worker => {
  //         worker(model.uri)
  //           .then(client => {
  //             client.getSyntacticDiagnostics(model.uri.toString()).then(r => {
  //               // not too helpful so far...
  //             })
  //             client.getEmitOutput(model.uri.toString()).then(r => {
  //               resolve(r);;
  //             });
  //           });
  //       });
  //   });
  // }

  // runCodeInFrontend() {
  //   this.reset();
  //   this.loading = true;
  //   this.transpile().then(resp => {
  //     const js = resp.outputFiles[0].text;
  //     if (js) {
  //       this.reset();
  //       eval(js);
  //       this.loading = false;
  //     }
  //   }).catch(errorResp => {
  //     console.log(errorResp);
  //   });
  // }
