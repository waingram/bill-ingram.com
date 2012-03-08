set :application, "bill-ingram.com"
set :repository,  "git://github.com/waingram/bill-ingram.com.git"

set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

server "bill-ingram.com", :app, :primary => true

set :user, "waingram"
set :group, "waingram"

set :deploy_to, "~/blog"
set :use_sudo, false

set :deploy_via, :copy

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :migrate do ; end
  task :migrations do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

