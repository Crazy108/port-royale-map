#!/bin/bash

echo "" > list.txt
rm -f list.txt
for o in 0 1 2 3 4 5
do
    for w in 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
    do
        for t in 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
        do
            echo 'http://commentatore.altervista.org/files/tiles/'${o}'_'${w}'_'${t}'.png' >>list.txt
            #curl 'http://commentatore.altervista.org/files/tiles/'${o}'_'${w}'_'${t}'.png' -H 'Referer: http://commentatore.altervista.org/files/index.html' -H 'User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36' --compressed --insecure
        done

    done

done

cat list.txt

#@$(foreach o,2 3 4 5, $(foreach w,0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15, $(foreach t,0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15, \
#		echo ./Applications/$(C).ujc >>app_file_list.txt \
#	)))
