echo 'Building app ...'

[ -d /var/www/html/samsung/AppDownloader.zip ] || rm /var/www/html/samsung/AppDownloader.zip

cat sssp_config.xml | sed "s/<ver.*$/<ver>1.`head -200 /dev/urandom | cksum | cut -f1 -d " "

`<\/ver>/g" > sssp_config.xml2
mv sssp_config.xml2 sssp_config.xml

cp sssp_config.xml		/var/www/html/samsung/sssp_config.xml

cd AppDownloader

echo 'Compressing app ...'
zip -r -q -l AppDownloader.zip .

mv AppDownloader.zip 		/var/www/html/samsung/AppDownloader.zip
