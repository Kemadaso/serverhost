module.exports = {
  apps : [{
    name: "serverhost",
    watch: true,
    script: './bin/www',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    exec_mode: "cluster",
    exp_backoff_restart_delay: 1000,
    instances: 2,
    //args: "npm run build",
    env: {
        "PORT": 2000,
        "NODE_ENV": "development"
    },


  }

]

}