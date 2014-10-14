# Deploy blog

# fix 'stdin is not a tty' error
default_run_options[:pty] = true
default_run_options[:shell] = '/bin/bash -l'

set :application, "bill-ingram.com"
set :repository,  "git://github.com/waingram/bill-ingram.com.git"

set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

server "bill-ingram.com", :app, :primary => true

set :user, "waingram"
set :group, "waingram"

set :deploy_to, "/home/waingram/blog"
set :copy_remote_dir, "/home/waingram/tmp"
set :normalize_asset_timestamps, false

set :use_sudo, false

set :deploy_via, :remote_cache

# Override default tasks which are not relevant to a non-rails app.
namespace :deploy do
  task :migrate do
    puts "    Not doing migrate because we are not a Rails application."
  end
  task :finalize_update do
    puts "    Not doing finalize_update because we are not a Rails application."
  end
  task :start do ; end
  task :stop do ; end
  task :restart do ; end
end


