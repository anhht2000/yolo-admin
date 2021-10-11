import fs from 'fs';
export function deleteFiles(files: string[], callback:any){
  var i = files.length;
  files.forEach(function(filepath:string){
    fs.unlink(filepath, function(err:any) {
      i--;
      if (err) {
        callback(err);
        return;
      } else if (i <= 0) {
        callback(null);
      }
    });
  });
}
