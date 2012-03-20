title: Regular Expression for Parsing Phone Numbers
date: 04/11/2011
author: Bill Ingram

This regular expression will parse most phone numbers into four groups: country code, area code, number, and extension. It works most of the time, see the examples below. 

Here's the expression:
    @@ruby   
    ^(?:[\+]?[\(]?([\d]{1,3})[\s\-\.\)]+)?(?:[\(]?([\d]{1,3})[\s\-\/\)]+)([2-9][0-9\s\-\.]{6,}[0-9])(?:[\s\D]+([\d]{1,5}))?$

Again, as a Java string:
    @@java
    "^(?:[\\+]?[\\(]?([\\d]{1,3})[\\s\\-\\.\\)]+)?(?:[\\(]?([\\d]{1,3})[\\s\\-\\/\\)]+)([2-9][0-9\\s\\-\\.]{6,}[0-9])(?:[\\s\\D]+([\\d]{1,5}))?$"

Results:
<table class="grid">
	<tbody>
	<tr>
		<th>Target String</th>
		<th>matches()</th>
		<th>group(0)</th>
		<th>group(1)</th>
		<th>group(2)</th>
		<th>group(3)</th>
		<th>group(4)</th>
	</tr>
	<tr>
		<td>011-656-555-1234</td>
		<td>Yes</td>
		<td>011-656-555-1234</td>
		<td>011</td>
		<td>656</td>
		<td>555-1234</td>
		<td></td>
</tr>
	<tr>
		<td>(217)555-1234</td>
		<td>Yes</td>
		<td>(217)555-1234</td>
		<td></td>
		<td>217</td>
		<td>555-1234</td>
		<td></td>
</tr>
	<tr>
		<td>(907) 555-1234</td>
		<td>Yes</td>
		<td>(907) 555-1234</td>
		<td></td>
		<td>907</td>
		<td>555-1234</td>
		<td></td>
</tr>
	<tr>
		<td>+82-10-5551-2345</td>
		<td>Yes</td>
		<td>+82-10-5551-2345</td>
		<td>82</td>
		<td>10</td>
		<td>5551-2345</td>
		<td></td>
</tr>
	<tr>
		<td>+(82) 10-5551-2345</td>
		<td>Yes</td>
		<td>+(82) 10-5551-2345</td>
		<td>82</td>
		<td>10</td>
		<td>5551-2345</td>
		<td></td>
</tr>
	<tr>
		<td>+886-2-55512345</td>
		<td>Yes</td>
		<td>+886-2-55512345</td>
		<td>886</td>
		<td>2</td>
		<td>55512345</td>
		<td></td>
</tr>
	<tr>
		<td>1-416-555-1234 ext 1234</td>
		<td>Yes</td>
		<td>1-416-555-1234 ext 1234</td>
		<td>1</td>
		<td>416</td>
		<td>555-1234</td>
		<td>1234</td>
</tr>
	<tr>
		<td>714 555 1234 / 1234</td>
		<td>Yes</td>
		<td>714 555 1234 / 1234</td>
		<td></td>
		<td>714</td>
		<td>555 1234</td>
		<td>1234</td>
</tr>
	<tr>
		<td>+1-714-555-1234</td>
		<td>Yes</td>
		<td>+1-714-555-1234</td>
		<td>1</td>
		<td>714</td>
		<td>555-1234</td>
		<td></td>
</tr>
	<tr>
		<td>+(82) 10-5326-5760</td>
		<td>Yes</td>
		<td>+(82) 10-5326-5760</td>
		<td>82</td>
		<td>10</td>
		<td>5326-5760</td>
		<td></td>
</tr>
</tbody>
</table>
