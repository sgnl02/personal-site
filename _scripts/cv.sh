#!/bin/sh

tail -n +5 cv/index.html > _pdf.html
pandoc _pdf.html -o cv/cv-stefan_jonker.pdf
rm _pdf.html
