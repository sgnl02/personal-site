#!/bin/bash
cd _posts/
touch `date +%Y-%m-%d`.md
echo -e "---\nlayout: post\ntitle:\ncategories:\n---\n" >> `date +%Y-%m-%d`.md
