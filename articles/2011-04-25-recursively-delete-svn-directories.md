title: Recursively Delete .svn Directories
author: Bill Ingram
date: 25/04/2011


Finding all the .svn directories is easy
    @@bash    
    $ find . -type d -name .svn
    ./.svn
    ./sourceA/.svn
    ./sourceB/.svn
    ./sourceB/module/.svn
    ./sourceC/.svn

Now use command substitution with `rm -rf`. 
    @@bash
    rm -rf `find . -type d -name .svn`

Note the use of the _backtick_ symbol (located under the ~ on the English keyboard)&mdash;that is not a single quote.