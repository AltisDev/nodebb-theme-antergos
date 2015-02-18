$('document').ready(function () {
	requirejs([
		'antergos/masonry',
		'antergos/imagesLoaded',
	], function (Masonry, imagesLoaded) {
		var fixed = localStorage.getItem('fixed') || 0,
			masonry;

		function initLayout() {
			function prepareParents() {
				$('.parent-cat').each(function (index) {
					var $pcat = $(this);
					var pcatId = 'pcat_' + index,
						$ccats = $pcat.children('.category-item');

					$pcat.addClass(pcatId);

					if (!$pcat.children('.new-row').length) {
						$ccats.each(function (index) {
							if ((index + 1) % 3 == 0) {
								$('<div class="clearfix visible-lg visible-md new-row"></div>').insertAfter($(this));
							}
						});
					}


				});
			}

			function doMasonry() {

				var containers = document.querySelectorAll('.parent-cat');
				for (var i = 0, len = containers.length; i < len; i++) {
					var container = containers[i];
					reallyDoMansonry(container)
				}

			}

			function reallyDoMansonry(container) {
				setTimeout(function () {
					new Masonry(container, {
						itemSelector: '.category-item',
						columnWidth: '.category-item:not(.col-lg-12)',
						transitionDuration: '0'
					});
				}, 400);
			}


			function resize(fixed) {
				fixed = parseInt(fixed, 10);

				var container = fixed ? $('.container-fluid') : $('.container');
				container.toggleClass('container-fluid', fixed !== 1).toggleClass('container', fixed === 1);
				localStorage.setItem('fixed', fixed);
			}

			function delayedCheck() {
				var $isLoggedIn = $('#isLoggedIn'),
					running = $isLoggedIn.hasClass('running');
				if (running === false) checkMasonry(0);
			}

			if ($('.categories').length) {
				var content = document.querySelectorAll('#content');
				prepareParents();
				imagesLoaded(content, doMasonry());
				setTimeout(delayedCheck, 1000);
			}
		}

		function checkMasonry(checks) {
			if ($('.categories').length) {
				var $allCats = $('.category-item').last(),
					$footer = $('footer').offset(),
					$isLoggedIn = $('#isLoggedIn');

				if ($allCats.length) {
					$allCats = $allCats.offset();
					$isLoggedIn.addClass('running');
					//if (checks === 0) doMasonry();
					if ($allCats['top'] > $footer['top']) {
						if (checks <= 10) {
							console.log('Check ' + checks + ': Grid items are outside of the container. Resetting the layout..');
							initLayout();
							checks++;
							setTimeout(checkMasonry(checks), 1000);
						}
					} else {
						console.log('No grid items were found outside of the container. Check ' + checks + ' passed!');
						if (checks <= 10) {
							console.log('Check will run again in 1 second.');
							checks++;
							setTimeout(checkMasonry(checks), 1000);
						} else {
							console.log('All checks passed! The grid is displayed properly!');
						}

					}
				}
			}
		}

		//resize(fixed);

		$(window).on('action:ajaxify.end', function (ev, data) {
			if (!/^admin\//.test(data.url) && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				if ($('.categories').length) {
					$('.category-header .badge i').tooltip();
				}
				initLayout();
				doSlick();
				showPasswdNotice();
			}
		});

		if (!$('.admin').length) {
			setupResizer();
		}

		$(window).on('action:posts.loaded', function () {
			initLayout();
			doSlick();
			showPasswdNotice();
		});

		function setupResizer() {
			var div = $('<div class="overlay-container"><div class="panel resizer pointer"><div class="panel-body"><i class="fa fa-arrows-h fa-2x"></i></div></div></div>');

			div.css({
				position: 'fixed',
				bottom: '20px',
				right: '20px'
			}).hide().appendTo(document.body);

			$(window).on('mousemove', function (ev) {
				if (ev.clientX > $(window).width() - 150 && ev.clientY > $(window).height() - 150) {
					div.fadeIn();
				} else {
					div.stop(true, true).fadeOut();
				}
			});

			div.find('.resizer').on('click', function () {
				fixed = parseInt(fixed, 10) === 1 ? 0 : 1;
				//resize(fixed);
				doMasonry();
			});
		}

		function doSlick() {
			if ($('.subcategories').length && !$('.slick-initialized').length) {

				$('.subcategories').slick({
					dots: true,
					infinite: true,
					speed: 300,
					slidesToShow: 4,
					slidesToScroll: 4
				});
			}
		}

		function showPasswdNotice() {

			var passwdNotice = localStorage.getItem('passwdNotice'),
				isLoggedIn = $('#isLoggedIn').val();


			if (passwdNotice !== 'True' && isLoggedIn !== 'true' && isLoggedIn !== true) {
				app.alert({
					title: 'Attention Existing Users:',
					message: 'All user accounts were imported from the old forum. For security reasons, passwords were' +
					' not imported. In order to activate your account on the new forum, you must reset your password' +
					' Click this message to <strong>reset your password now</strong>.',
					location: 'right-top',
					type: 'info',
					image: '//antergos.org/info.png',
					closefn: function passwdNoticeClosed() {
						localStorage.setItem('passwdNotice', 'True');
					},
					clickfn: function passwdNoticeClicked() {
						localStorage.setItem('passwdNotice', 'True');
						window.location = '/reset';
					}
				});
			}
		}

	});

	(function () {
		// loading animation
		var refreshTitle = app.refreshTitle,
			$loadingBar = $('.loading-bar');

		$(window).on('action:ajaxify.start', function (data) {
			$loadingBar.fadeIn(0).removeClass('reset');
		});

		$(window).on('action:ajaxify.loadingTemplates', function () {
			$loadingBar.css('width', '90%');
		});

		app.refreshTitle = function (url) {
			$loadingBar.css('width', '100%');
			setTimeout(function () {
				$loadingBar.fadeOut(250);

				setTimeout(function () {
					$loadingBar.addClass('reset').css('width', '0%');
				}, 250);
			}, 750);

			return refreshTitle(url);
		};
	}());
});