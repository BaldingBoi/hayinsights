#!/bin/bash

GG_TOKEN='_Gb4MAZgegM5Jbwv3aaFbd6aHS4JUlms1nsCTHqIfDw%3D'
GG_KEY='AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI'
URI_GGCHAT="https://chat.googleapis.com/v1/spaces/AAAAXAWH9_g/messages?key=${GG_KEY}&token=${GG_TOKEN}"

MESSAGE=$1

RESULT=$(curl -H "Content-Type: application/json" -X POST -d "{\"text\":\"$MESSAGE\"}" -s "$URI_GGCHAT" -w "%{http_code}")
echo "$RESULT"
if [ "$RESULT" = "403" ]; then
  fail "The caller does not have permission"
fi
