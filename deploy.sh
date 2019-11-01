#!/bin/bash
#set -x #debug mode
if [[ -f ./.env ]]; then source ./.env; fi

echo "DEPLOY FROM ROOT DIR"
echo "GOOGLE MAP KEY IS ${GOOGLE_MAP_KEY}"
echo "GOOGLE MAP KEY IS "${GOOGLE_MAP_KEY}