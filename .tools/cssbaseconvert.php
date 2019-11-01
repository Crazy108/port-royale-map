#!/usr/bin/env php

<?php
if(!empty($_SERVER['PWD']) && !empty($argv[1]) && file_exists($argv[1]))
    file_put_contents(str_replace(".src.", ".base.", $argv[1]), preg_replace_callback('/\'(.*images\/[-\w\/\.]*)\'/i', function($match) {return "data:image/".((substr($match[1],-4)==".png")?"png":"gif").";base64,".base64_encode(file_get_contents($match[1]));}, file_get_contents($argv[1])));
