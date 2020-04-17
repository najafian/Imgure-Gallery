#!/bin/sh

echo "The application will start"
exec java ${JAVA_OPTS} -noverify -XX:+AlwaysPreTouch -Djava.security.egd=file:/dev/./urandom -cp /app/resources/:/app/classes/:/app/libs/* "com.mobi.lab.imgurGalleryApp"  "$@"
