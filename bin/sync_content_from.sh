#!/usr/bin/env bash

if [ -z "$JOSHCANHELP_CONTENT_DIR" ]
then
    echo "Must provide JOSHCANHELP_CONTENT_DIR in environment" 1>&2
    exit 1
fi

rsync -rv --delete "$JOSHCANHELP_CONTENT_DIR"/cocktails/ ./input/cocktails;
rsync -rv --delete "$JOSHCANHELP_CONTENT_DIR"/ideas/ ./input/ideas;
rsync -rv --delete "$JOSHCANHELP_CONTENT_DIR"/pages/ ./input/pages;
rsync -rv --delete "$JOSHCANHELP_CONTENT_DIR"/posts/ ./input/posts;