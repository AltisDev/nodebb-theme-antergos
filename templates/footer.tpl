	</div><!--END container -->
<footer id="main-footer">
				


		
				<div id="footer-bottom">
					<div class="et-container clearfix">
				<ul class="et-social-icons">

	<li class="et-social-icon et-social-facebook">
		<a href="//www.facebook.com/pages/Antergos/649575488393114" class="icon">
			<span>Facebook</span>
		</a>
	</li>
	<li class="et-social-icon et-social-twitter">
		<a href="//www.twitter.com/antergos" class="icon">
			<span>Twitter</span>
		</a>
	</li>
	<li class="et-social-icon et-social-google-plus">
		<a href="//plus.google.com/communities/116626481503903480477" class="icon">
			<span>Google</span>
		</a>
	</li>
	<li class="et-social-icon et-social-rss">
		<a href="/feed" class="icon">
			<span>RSS</span>
		</a>
	</li>

</ul>
						<p id="footer-info">Copyright &copy; 2015 <a href="http://antergos.org" title="Antergos">Antergos</a> | Forum powered by <a href="http://www.nodebb.org">NodeBB.</a></p>
					</div>	<!-- .container -->
				</div>
			</footer>
</div>
	<div id="upload-picture-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="Upload Picture" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					<h3 id="myModalLabel">[[user:upload_picture]]</h3>
				</div>
				<div class="modal-body">
					<form id="uploadForm" action="" method="post" enctype="multipart/form-data">
						<div class="form-group">
							<label for="userPhoto">[[user:upload_a_picture]]</label>
							<input type="file" id="userPhotoInput"  name="userPhoto">
							<p class="help-block">[[user:image_spec]] <span id="file-size-block" class="hide"> ([[user:max]] <span id="upload-file-size"></span> kbs.)</span></p>
						</div>
						<input type="hidden" id="params" name="params" />
					</form>

					<div id="upload-progress-box" class="progress progress-striped">
						<div id="upload-progress-bar" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0">
							<span class="sr-only"> [[success:success]]</span>
						</div>
					</div>

					<div id="alert-status" class="alert alert-info hide"></div>
					<div id="alert-success" class="alert alert-success hide"></div>
					<div id="alert-error" class="alert alert-danger hide"></div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-default" data-dismiss="modal" aria-hidden="true">Close</button>
					<button id="pictureUploadSubmitBtn" class="btn btn-primary">[[user:upload_picture]]</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<div class="topic-search hidden">
		<div class="btn-group">
			<button type="button" class="btn btn-default count"></button>
			<button type="button" class="btn btn-default prev"><i class="fa fa-fw fa-angle-up"></i></button>
			<button type="button" class="btn btn-default next"><i class="fa fa-fw fa-angle-down"></i></button>
		</div>
	</div>
	<div class="alert-window alert-left-top"></div>
	<div class="alert-window alert-left-bottom"></div>
	<div class="alert-window alert-right-top"></div>
	<div class="alert-window alert-right-bottom"></div>

	<script>
		require(['forum/footer']);
	</script>
</body>
</html>
