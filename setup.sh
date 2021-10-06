#!/bin/sh
echo "started cana setup"


echo "=====================Setup Cana Api================================="
cd cana-Api
git fetch --all
git checkout main
git pull origin
cd ..
echo "=====================Cana Api script completed================================="

echo "=====================Setup Cana component================================="
cd cana-component
git fetch --all
git checkout main
git pull origin
cd ..
echo "=====================Cana component script completed================================="

echo "=====================Setup media component================================="
cd cana-media
git fetch --all
git checkout main
git pull origin
cd ..
echo "=====================Cana media script completed================================="

echo "=====================Setup cana-scheduler component================================="
cd cana-scheduler
git fetch --all
git checkout main
git pull origin
cd ..
echo "=====================Cana cana-scheduler script completed================================="

