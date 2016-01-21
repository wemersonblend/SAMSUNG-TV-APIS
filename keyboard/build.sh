echo 'Building app ...'

# Remove old pakcage
[ -d /var/www/html/samsung/AppKeyboard.zip ] || rm /var/www/html/samsung/AppKeyboard.zip

cat sssp_config.xml | sed "s/<ver.*$/<ver>1.`head -200 /dev/urandom | cksum | cut -f1 -d " "

`<\/ver>/g" > sssp_config2.xml
mv sssp_config2.xml 	sssp_config.xml

cp sssp_config.xml		/var/www/html/samsung/sssp_config.xml
cp sssp_config.xml		/var/www/html/samsung/Apps/sssp_config.xml

echo 'Compressing app ...'
cd AppKeyboard
zip -r -q -l AppKeyboard.zip .
# git archive -o ../app.zip HEAD

cd ..

ls

mv AppKeyboard.zip 		/var/www/html/samsung/AppKeyboard.zip

echo 'Copying Files to local deploy'
# Copying file to local deploy
rm /var/www/html/samsung/Apps/AppKeyboard -Rf
mkdir /var/www/html/samsung/Apps/AppKeyboard
cp AppKeyboard/* /var/www/html/samsung/Apps/AppKeyboard -Rf

#function getVersion(str, tag) {	var match, result = "", regex = /<ver>(.*?)<\/ver>/ig;	while (match = regex.exec(str)) { result += match[1]; }	return result;}
