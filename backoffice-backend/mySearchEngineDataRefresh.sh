cd ~/Bureau/TME_webAPI_ALGAVAD/mySearchEngine &&
source ../myTidyVEnv/bin/activate &&
python3 manage.py refreshOnSaleList >> ~/mySearchEngineLog &&
python3 manage.py refreshAvailableList >> ~/mySearchEngineLog &&
python3 manage.py refreshPoissonList >> ~/mySearchEngineLog &&
python3 manage.py refreshCrustaceList >> ~/mySearchEngineLog &&
python3 manage.py refreshCoquillageList >> ~/mySearchEngineLog &&
python3 manage.py refreshInfoList >> ~/mySearchEngineLog &&
deactivate
