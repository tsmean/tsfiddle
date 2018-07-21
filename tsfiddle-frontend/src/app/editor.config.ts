import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';

export const monacoConfig: NgxMonacoEditorConfig = {
    defaultOptions: {
        scrollBeyondLastLine: false,
        minimap: {
            enabled: false
        }
    }
};