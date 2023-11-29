
import os
import csv
import json

from algoliasearch.search_client import SearchClient


client = SearchClient.create("T81G59BI39", "af12ec85466e0e85bc8cc01bf527cfde")
index = client.init_index("my-notes")



def remove_objects():

    index.clear_objects()




if __name__ == "__main__":
    remove_objects()


