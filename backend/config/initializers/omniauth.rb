Rails.application.config.middleware.use OmniAuth::Builder do
    provider :github, Rails.application.credentials.GITHUB_KEY, Rails.application.credentials.GITHUB_SECRET, scope: "user,repo,gist"
  end

  
  