module.exports = {
    apps : [
        {
            script: 'index.js',
            name: "csis-321-api",
            watch: true,
            watch_delay: 2000,
            ignore_watch : ["node_modules"]
        }
    ]
};
