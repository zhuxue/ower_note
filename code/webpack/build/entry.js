
const glob = require('glob');

const path = require('path');


class Entries {

    constructor(  pattern = path.join(__dirname,"../","src/page/**/main.js") ) {

       this.pattern =  pattern;

    }

    get_entries() {
         let entries = {} ;
         let files_array =  glob.sync(this.pattern);

         files_array.forEach( ( filePath ) => {
               var split = filePath.split('/');
               var name = split[split.length - 2];
               entries[name] =  filePath ;

         });
         return entries ;

    }

}

module.exports = Entries








// console.log(glob.sync(pattern))