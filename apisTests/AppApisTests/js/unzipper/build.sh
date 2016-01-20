echo 'Building app ...'

[ -d /var/www/html/samsung/AppUnzipper.zip ] || rm /var/www/html/samsung/AppUnzipper.zip

cat sssp_config.xml | sed "s/<ver.*$/<ver>1.`head -200 /dev/urandom | cksum | cut -f1 -d " "

`<\/ver>/g" > sssp_config.xml2
mv sssp_config.xml2 sssp_config.xml

cp sssp_config.xml		/var/www/html/samsung/sssp_config.xml

cd AppUnzipper

echo 'Compressing app ...'
zip -r -q -l AppUnzipper.zip .

mv AppUnzipper.zip 		/var/www/html/samsung/AppUnzipper.zip
