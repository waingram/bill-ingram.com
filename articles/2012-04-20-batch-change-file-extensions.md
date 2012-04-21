title: Batch Change File Extensions 
date: 20/04/2012
author: Bill Ingram

Change file extensions _en masse_ with this easy line of code:
    @@bash
    for f in *.txt; do base=`basename $f .txt`; mv $f $base.md; done

Perfect.


