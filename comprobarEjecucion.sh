#!/bin/bash

NAME="server.js" # nodejs script's name here
RUN=`pgrep -f $NAME`

if [ "$RUN" == "" ]; then
 echo "Script is not running"
 node server.js >> logs.txt &>> logs.txt &
else
 echo "Script is running"
fi
