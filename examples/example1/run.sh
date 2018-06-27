echo "you can obtain a key for this example at: http://www.omdbapi.com/apikey.aspx"
echo "please enter your api key"
read -s apiKey
tmp=$(mktemp)
jq --arg apiKey "$apiKey" '.queryParams.apiKey = $apiKey' options.json > "$tmp" && mv "$tmp" options.json
echo 'running command: "rat --raml ./api.raml --optionsFile ./options.json"'
rat --raml ./api.raml --optionsFile ./options.json