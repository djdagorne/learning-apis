const searchURL = 'https://api.github.com/users/';

// /users/:username/repos

function displayResults(responseJson, maxResults) {
  console.log('displayresults running');
  console.log(responseJson);
  $('#results-list').empty();
  $('#error-message').empty();
  for (let i = 0; i < responseJson.length & i<maxResults ; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      <p>author username: ${responseJson[i].owner.login}</p>
      <p>description: ${responseJson[i].description}</p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function formatQueryParams(params){
const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
};

function getRepo(searchTerm, maxResults){
  const params = {
    type: 'owner',
    sort: 'updated',
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + searchTerm + "/repos?" + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        console.log('response.ok is true')
        $('#error-message').empty();
        return response.json();
      }
    })
    .then(responseJson => displayResults(responseJson, maxResults))    
    .catch(err => {
      
      $('#results-list').empty();
      $('#js-error-message').text(`Something went wrong: ${err.message}`);    
    });
};


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getRepo(searchTerm, maxResults);
  });
}

$(watchForm);