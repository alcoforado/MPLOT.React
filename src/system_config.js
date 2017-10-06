process = {
    env: {
        NODE_ENV:"develop"
    }
};


System.config({
    paths: {
        // paths serve as alias
        'components': '/src/components',
        'npm:' : '/node_modules/',
        '*': '/node_modules/*',
    },
    defaultJSExtensions: true,
    packageConfigPaths: ['node_modules/*/package.json'],
    map: {
        // angular bundles
       
        'object-assign':'/node_modules/object-assign',
        'react': '/node_modules/react',
        'react-dom': '/node_modules/react-dom',
        'main':'/src/main.js',
        // other libraries
        'rxjs': 'npm:rxjs',
        'rxjs/Observable': 'npm:rxjs/Observable',
        'rxjs/Rx': 'npm:rxjs/Rx',
        'd3': 'npm:d3/build/d3.min.js',
        'prop-types': '/node_modules/prop-types'
        
    },
   // packages tells the System loader how to load when no filename and/or no extension
    packages: {
       
        'object-assign' : {main: 'index.js', defaultExtension: 'js' },
        'react': {main: 'index.js', defaultExtensions: 'js'},
        'prop-types': {main: 'index.js', defaultExtension: 'js'},
        'react-dom': {main: 'index.js',defaultExtensions: 'js'}
        
        // ,'d3' : {main: 'index.js', defaultExtension: 'js' }
        // barrels
        // 'app/core':   { main: 'index'},
        // 'app/models': { main: 'index'},
    }
});


