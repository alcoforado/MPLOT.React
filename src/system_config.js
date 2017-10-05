process = {
    env: {
        NODE_ENV:"develop"
    }
};

System.config({
    baseURL: "../",
    paths: {
        // paths serve as alias
        'npm:': '../node_modules/',
        'ts:': 'typescript/',
        'js:': 'javascript/',
        'jsts':'javascript/typescript/',
        'fbjs': '../node_modules/fbjs',
        'prop-types': 'node_modules/prop-types'
    },
    
    map: {
        // angular bundles
        
        'object-assign':'node_modules/object-assign',
        'react': 'node_modules/react',
        'react-dom': 'node_modules/react-dom',
        'main':'src/main.js',
        // other libraries
        'rxjs': 'npm:rxjs',
        'rxjs/Observable': 'npm:rxjs/Observable',
        'rxjs/Rx': 'npm:rxjs/Rx',
        'd3': 'npm:d3/build/d3.js',
        'prop-types': 'node_modules/prop-types'
        
    },
   // packages tells the System loader how to load when no filename and/or no extension
    packages: {
        'api': { defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'src/': { defaultExtension: 'js' },
        'fbjs': {defaultExtension: 'js'},
        'object-assign' : {main: 'index.js', defaultExtension: 'js' },
        'react': {main: 'index.js', defaultExtensions: 'js'},
        'prop-types': {main: 'index.js', defaultExtension: 'js'},
        'react-dom': {main: 'index.js',defaultExtensions: 'js'}

        // barrels
        // 'app/core':   { main: 'index'},
        // 'app/models': { main: 'index'},
    }
});


