title: Installing PostgreSQL-8.2 on Ubuntu 10.04
date: 10/05/2011
author: Bill Ingram

First, add the Hardy repositories to apt-get sources. If this file does not already exist, create it.
    @@bash   
    sudo vim /etc/apt/sources.list.d/hardy.list

Add the Hardy repos.
    @@bash
    deb http://us.archive.ubuntu.com/ubuntu/ hardy universe
    deb http://us.archive.ubuntu.com/ubuntu/ hardy-updates universe
    deb http://us.archive.ubuntu.com/ubuntu/ hardy-security universe

Update apt-get, and install.
    @@bash
    sudo apt-get update
    sudo apt-get install postgres-8.2
      Reading package lists... Done
      Building dependency tree       
      Reading state information... Done
      Some packages could not be installed. This may mean that you have
      requested an impossible situation or if you are using the unstable
      distribution that some required packages have not yet been created
      or been moved out of Incoming.
      The following information may help to resolve the situation:
    
      The following packages have unmet dependencies:
        postgresql-8.2: Depends: libkrb53 (>= 1.6.dfsg.2) but it is not installable
      E: Broken packages

That's not good. It turns out `libkrb53` has been replaced by `libkrb5-3` in Ubuntu 10.04. To make matters worse, the old `libkrb53` package was split up into several other packages (`libkrb5-3` for `libkrb5` itself, but also `libgssapi-krb5-2`, `libk5crypto3`, and `libkrb5support0`).

Here's the fix (see [Bug #462059](https://bugs.launchpad.net/ubuntu/+source/root-system/+bug/462059 "Bug #462059")). Use equivs to generate a fake transitional `libkrb53` package.

Create a dummy file called `libkrb.txt`, with this text:
    @@bash
    Package: libkrb53
    Version: 1.6.dfsg.2+fake1
    Depends: libkrb5-3, libgssapi-krb5-2, libk5crypto3, libkrb5support0

Run `equivs-build` on the dummy file. (You may have to `sudo apt-get install equivs` first.)
    @@bash
    sudo equivs-build krb.txt

This will generate the file `libkrb53_1.6.dfsg.2+fake1_all.deb`. Install the resulting .deb.

    sudo dpkg -i libkrb53_1.6.dfsg.2+fake1_all.deb

Now install postgresql-8.2; it's dependencies are resolved. 

    sudo apt-get install postgresql-8.2
      Reading package lists... Done  
      Building dependency tree       
      Reading state information... Done
      Suggested packages:
        oidentd ident-server
      The following NEW packages will be installed:
        postgresql-8.2
      ...
      ...
      ...
      Starting PostgreSQL 8.2 database server

Done!
