ROOT_DIR=$(pwd)

for PROJECT in $(ls packages) 
do
  cd ${ROOT_DIR}/blog/${PROJECT}/
  pnpm install 
  cd ${ROOT_DIR}
done
