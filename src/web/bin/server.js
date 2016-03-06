#!/usr/bin/env node

/**
 * Static HTTP Server
 *
 * Create a static file server instance to serve files
 * and folder in the './built' folder
 */

// modules
var static = require( 'node-static' ),
    port = 5000,
    http = require( 'http' );

// config
var file = new static.Server( './built', {
    cache: 3600,
    gzip: true
} );

// serve
http.createServer( function ( request, response ) {
    request.addListener( 'end', function () {
        file.serve( request, response );
    } ).resume();
} ).listen( port );