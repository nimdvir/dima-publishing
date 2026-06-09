$b64 = Get-Content 'G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\ch02-mis-bitm\ch02-used\ch02-concepts.b64' -Raw
$b64 = $b64 -replace '^data:image/\w+;base64,', ''
$bytes = [Convert]::FromBase64String($b64)
[IO.File]::WriteAllBytes('G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\ch02-mis-bitm\ch02-used\ch02-concepts.jpg', $bytes)

$b64_2 = Get-Content 'G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\ch02-mis-bitm\ch02-used\ch02-all.b64' -Raw
$b64_2 = $b64_2 -replace '^data:image/\w+;base64,', ''
$bytes_2 = [Convert]::FromBase64String($b64_2)
[IO.File]::WriteAllBytes('G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images\ch02-mis-bitm\ch02-used\ch02-all.jpg', $bytes_2)
