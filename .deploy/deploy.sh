#!/bin/bash

cd .deploy

mup setup

mup deploy --verbose --cached-build
