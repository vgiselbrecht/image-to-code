$("document").ready(function(){
  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
	if(files.length > 0)
	{
		work(files);
	}
  }
  function handleFileSelectDrop(evt) {
		var files = evt.dataTransfer.files;
		evt.stopPropagation();
		evt.preventDefault();
		work(files);
  }
  
  function work(files)
  {
	$('#result').hide();
	$('#loading').show();
	// Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var imgCode = '<img src="'+e.target.result+'" title="'+escape(theFile.name)+'"/>';
		  $('#code').val(e.target.result);		
		  $('#codeHTML').val(imgCode);		  
		  $('#output').html(imgCode);	
		  $('#result').show();
		  $('#loading').hide();
          //document.getElementById('output').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
  
  
  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }
  
  function handleDragLeave(evt) {
	$('#drop_zone').css('border-color','#888');
	$('#drop_zone').css('color','#888');
  }
  
  function handleDragEnter(evt) {
	$('#drop_zone').css('border-color','#222');
	$('#drop_zone').css('color','#222');
  }
  
  document.getElementById('inputFile').addEventListener('change', handleFileSelect, false);
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('ondragenter', handleDragEnter, false);
  dropZone.addEventListener('ondragleave', handleDragLeave, false);
  dropZone.addEventListener('drop', handleFileSelectDrop, false);
});