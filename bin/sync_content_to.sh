#!/usr/bin/env bash

if [ -z "$JOSHCANHELP_CONTENT_DIR" ]
then
    echo "Must provide JOSHCANHELP_CONTENT_DIR in environment" 1>&2
    exit 1
fi

rsync -rv --delete ./input/cocktails/ "$JOSHCANHELP_CONTENT_DIR"/cocktails;
rsync -rv --delete ./input/ideas/  "$JOSHCANHELP_CONTENT_DIR"/ideas;
rsync -rv --delete ./input/pages/ "$JOSHCANHELP_CONTENT_DIR"/pages;
rsync -rv --delete ./input/posts/ "$JOSHCANHELP_CONTENT_DIR"/posts;