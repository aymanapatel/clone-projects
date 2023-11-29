import os
import csv

from algoliasearch.search_client import SearchClient

# add conditional for github workflow 
#  Application ID and API Key


#from jproperties import Properties
#configs = Properties()
#with open('keys.properties', 'rb') as config_file:
#    configs.load(config_file)
#client = SearchClient.create(configs.get("ALGOLIAapplicationid").data, configs.get("ALGOLIAapikeysecret").data) #local

client = SearchClient.create("T81G59BI39", str(os.environ.get("KEY")))

index = client.init_index("my-notes")


def add_records(filename: str):

    with open(filename, newline="") as f:
        csv_r = list(csv.DictReader(f, delimiter=";"))

        # Bug: This checks # of rows and not change in indices
        try: 
            len_idx = index.search("")["nbHits"]
            if len(csv_r) > len_idx:
                index.save_objects(
                    csv_r[len_idx:], {"autoGenerateObjectIDIfNotExist": "true"}
                )
                print(f"{len(csv_r[len_idx:])} new records added.")
                return
        except:
            print("Exception")   

    print("Nothing new.")


if __name__ == "__main__":
    add_records("projects.csv")
