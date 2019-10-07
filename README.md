# Libreoffice: Bulk convert documents

A simple and fast node.js utility for batch converting office documents to different formats.

## Requirements

- [Node and npm](https://nodejs.org) (v8.11.1 and v6.1.0)
- [Libreoffice](https://www.libreoffice.org/) (v6.3.2)

Please install libreoffice in /Applications (Mac), with your favorite package manager (Linux), or with the msi (Windows).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.
Clone the repo and install the dependencies.

```sh
git clone https://github.com/vaibhavbhuva/doc_file_convertor.git # or clone your own fork
cd doc_file_convertor
npm install
```

### Configuration

Update convert.js with following details

``` 
const inputDir = ''; // Input directory path 
const inputExt = 'doc'; // Input file extension name
const outputDir = ''; // Output directory path
const outputExt = 'pdf'; // Output extension name
```

## Dependencies

Package | Version
--- |:---:
[readdirp](https://www.npmjs.com/package/readdirp) | 3.1.3
[fs-extra](https://www.npmjs.com/package/fs-extra) | 8.1.0
