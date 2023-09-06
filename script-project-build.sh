#!/bin/bash

for project in blog server; do
  cd $project
  npm build
  cd ..
done
