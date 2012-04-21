require 'toto'

BLOG_URL = "http://bill-ingram.com/"

@config = Toto::Config::Defaults
@config[:ext] = 'md'

task :default => :new

desc "Create a new article."
task :new do
  title = ask('Title: ')
  slug = title.empty?? nil : title.strip.slugize

  article = {'title' => title, 'date' => Time.now.strftime("%d/%m/%Y")}.to_yaml
  article << "\n"
  article << "Once upon a time...\n\n"

  path = "#{Toto::Paths[:articles]}/#{Time.now.strftime("%Y-%m-%d")}#{'-' + slug if slug}.#{@config[:ext]}"

  unless File.exist? path
    File.open(path, "w") do |file|
      file.write article
    end
    toto "an article was created for you at #{path}."
  else
    toto "I can't create the article, #{path} already exists."
  end
end


def article_date article
  d, m, y = article.date.split "/"
  Time.new(y, m, d)
end

desc "Rebuild sitemap"
task :sitemap do
  articles = Toto::Site.new(@config).archives.delete(:archives)
  
  xml = Builder::XmlMarkup.new(:indent => 2)
  xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
    xml.url do
      xml.loc BLOG_URL
      xml.lastmod article_date(articles.first).strftime '%Y-%m-%d'
      xml.changefreq "weekly"
      xml.priority 0.8
    end

    archived = Time.new - (365 * 24 * 60 * 60)

    articles.each do |article|
      date = article_date(article)
      xml.url do
        xml.loc "#{BLOG_URL}#{article.path.slice(1..-1)}"
        xml.lastmod date.strftime '%Y-%m-%d'
        xml.changefreq (date < archived) ? "never" : "monthly"
      end
    end
  end

  File.open "public/sitemap.xml", "w+" do |f|
    f.puts xml.target!
  end
end

desc "Publish my blog."
task :publish do
  toto "publishing your article(s)..."
  #`git push heroku master`
  p "run cap deploy\n\n"
end

def toto msg
  puts "\n  toto ~ #{msg}\n\n"
end

def ask message
  print message
  STDIN.gets.chomp
end

