#!/bin/bash

for project in blog server; do
  cd $project
  npm install
  cd ..
done
