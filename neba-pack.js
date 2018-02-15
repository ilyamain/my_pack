// Neba resize
//
// This is function, that can solve many problems with all problems of responsive design. 
// It scale all selected tags proportionally
// This functions can be called with parameters for example:
// $(document).ready(function() {nebaResize({resizeElementNames: [<TAGS_CALLS>], <PARAMETERS>});
// TAGS_CALLS - is array of tags: ['#block-block-1', '#block-block-2', '#block-block-3'].
// PARAMETERS include: resizeBodyWidthMax (1140 - by default), resizeBodyWidthMin (10 - by 
// default), resizeScaleMax (1 -by default) and exluded resizing parameters as object.
// 
// Example of using nebaResize function is below:
//$(document).ready(function () 
//{
//	nebaResize(
//	{
//		resizeElementNames: 
//		[
//			'#block-id-1',
//			'.block-class-2',
//			'block-tagmane-3'
//		],
//		resizeBodyWidthMax: 2000,
//		exclude: 
//		{
//			TransformOrigin: true,
//			Transform: true
//		}
//	});
//});
function nebaResize (resizeOptions) 
{
	if (typeof resizeOptions === 'undefined') var resizeOptions = new Object;
	nebaResizeInit(resizeOptions);

	function nebaResizeInit (resizeOptions) 
	{
		if (typeof resizeOptions === 'undefined') var resizeOptions = new Object;
		$(window).bind("load", function () 
		{
			nebaResizeProcedure(resizeOptions);
		});
		$(window).bind("resize", function () 
		{
			nebaResizeProcedure(resizeOptions);
		});
		$(window).bind("orientationchange", function () 
		{
			nebaResizeProcedure(resizeOptions);
		});
	}

	function nebaResizeTag () 
	{
		var resizeElementNames = [];
		return resizeElementNames;
	}

	function nebaResizeParams (resizeParamName) 
	{
		var resizeBodyWidthMax = 1140;
		var resizeBodyWidthMin = 10;
		var resizeScaleMax = 1;
		switch (resizeParamName) 
		{
			case 'resizeBodyWidthMax': 
				return resizeBodyWidthMax;
				break;
			case 'resizeBodyWidthMin': 
				return resizeBodyWidthMin;
				break;
			case 'resizeScaleMax': 
				return resizeScaleMax;
				break;
			default: 
				return '';
				break;
		};
	}

	function nebaResizeProcedure (resizeOptions) 
	{
		if (typeof resizeOptions === 'undefined') var resizeOptions = new Object;
		if (typeof resizeOptions.exclude === 'undefined') resizeOptions.exclude = new Object;
		var resizeElementNames = resizeOptions.resizeElementNames || nebaResizeTag();
		var resizeBodyWidthMax = resizeOptions.resizeBodyWidthMax || nebaResizeParams('resizeBodyWidthMax');
		var resizeBodyWidthMin = resizeOptions.resizeBodyWidthMin || nebaResizeParams('resizeBodyWidthMin');
		var resizeScaleMax = resizeOptions.resizeScaleMax || nebaResizeParams('resizeScaleMax');
		var bodyWidth = document.body.clientWidth;
		var resizeScaleMin = resizeScaleMax*resizeBodyWidthMin/resizeBodyWidthMax;
		var resizeScale = resizeScaleMax;
		$.each(resizeElementNames, function (index, resizeElementName) 
		{
			$(resizeElementName).removeAttr('style');
			$(resizeElementName).children().removeAttr('style');
			if ((bodyWidth)&&($(resizeElementName).length>0)) 
			{
				if ((bodyWidth>=resizeBodyWidthMin)&&(bodyWidth<=resizeBodyWidthMax)) 
				{
					//Find needed resize rate
					resizeScale = bodyWidth/resizeBodyWidthMax;
					resizeScale = Math.min(resizeScale, resizeScaleMax);
					resizeScale = Math.max(resizeScale, resizeScaleMin);
					if (isNaN(resizeScale)) {resizeScale = 1;}
					//Find needed values
					var resizeMarginTop = resizeScale*$(resizeElementName).css('margin-top').replace( 'px', '' );
					var resizePaddingTop = resizeScale*$(resizeElementName).css('padding-top').replace( 'px', '' );
					var resizeMarginBottom = resizeScale*$(resizeElementName).css('margin-bottom').replace( 'px', '' );
					var resizePaddingBottom = resizeScale*$(resizeElementName).css('padding-bottom').replace( 'px', '' );
					var resizeMarginLeft = resizeScale*$(resizeElementName).css('margin-left').replace( 'px', '' );
					var resizePaddingLeft = resizeScale*$(resizeElementName).css('padding-left').replace( 'px', '' );
					var resizeMarginRight = resizeScale*$(resizeElementName).css('margin-right').replace( 'px', '' );
					var resizePaddingRight = resizeScale*$(resizeElementName).css('padding-right').replace( 'px', '' );
					var resizeHeight = resizeScale*$(resizeElementName).css('height').replace( 'px', '' );
					var resizeMinHeight = resizeScale*$(resizeElementName).css('min-height').replace( 'px', '' );
					var resizeMinWidth = resizeScale*$(resizeElementName).css('min-width').replace( 'px', '' );
					//Appending values child
					if (!resizeOptions.exclude.TransformOrigin) $(resizeElementName).children().css('transform-origin', '0px 0px');
					if (!resizeOptions.exclude.Transform) $(resizeElementName).children().css('transform', 'scale('+resizeScale+')');
					if (!resizeOptions.exclude.Width) $(resizeElementName).children().css('width', resizeBodyWidthMax);
					if (!resizeOptions.exclude.MinWidth) $(resizeElementName).children().css('min-width', resizeMinWidth+'px');
					//Appending values
					if (!resizeOptions.exclude.MinHeight) $(resizeElementName).css('min-height', resizeMinHeight+'px');
					if (!resizeOptions.exclude.MarginTop) $(resizeElementName).css('margin-top', resizeMarginTop+'px');
					if (!resizeOptions.exclude.MarginBottom) $(resizeElementName).css('margin-bottom', resizeMarginBottom+'px');
					if (!resizeOptions.exclude.MarginLeft) $(resizeElementName).css('margin-left', resizeMarginLeft+'px');
					if (!resizeOptions.exclude.MarginRight) $(resizeElementName).css('margin-right', resizeMarginRight+'px');
					if (!resizeOptions.exclude.PaddingTop) $(resizeElementName).css('padding-top', resizePaddingTop+'px');
					if (!resizeOptions.exclude.PaddingBottom) $(resizeElementName).css('padding-bottom', resizePaddingBottom+'px');
					if (!resizeOptions.exclude.PaddingLeft) $(resizeElementName).css('padding-left', resizePaddingLeft+'px');
					if (!resizeOptions.exclude.PaddingRight) $(resizeElementName).css('padding-right', resizePaddingRight+'px');
					//Delete white space
					if (!resizeOptions.exclude.Height) 
					{
						if (resizeOptions.resizeDelWhiteSpace) 
						{
							resizeHeight = resizeScale*$(resizeElementName).children().css('height').replace( 'px', '' );
							$(resizeElementName).css('height', resizeHeight+'px');
						}
						else 
						{
							$(resizeElementName).css('height', resizeHeight+'px');
						}
					}
				}
			}
			else 
			{
				window.setTimeout(nebaResizeProcedure, 30);
			}
		});
	}
}


// Neba scroll Function. This is add/remove classnames for elements on scrolling
// Each call element is a object with specific parameters. For example:
//     $(document).ready(function() {
//        nebaScroll({
//            element: {
//                scrollElementNames: ['#block-id'],
//                scrollAddClass: 'neba-classname',
//                scrollOnAdd: 200,
//                scrollOnRemove: 150,
//                fromTop: false
//            }
//        })
//    });
function nebaScroll (scrollOptions) 
{
	if (typeof scrollOptions === 'undefined') var scrollOptions = new Object;
	nebaScrollInit(scrollOptions);

	function nebaScrollInit (scrollOptions) 
	{
		if (typeof scrollOptions === 'undefined') var scrollOptions = new Object;
		$(window).bind("scroll", function () 
		{
			nebaScrollProcedure(scrollOptions);
		});
	}

	function nebaScrollTag () 
	{
		var scrollElementNames = [];
		return scrollElementNames;
	}

	function nebaScrollParams (scrollParamName) 
	{
		var scrollAddClass = 'is-shown';
		var scrollOnAdd = 200;
		var scrollOnRemove = 200;
		switch (scrollParamName) 
		{
			case 'scrollAddClass': 
				return scrollAddClass;
				break;
			case 'scrollOnAdd': 
				return scrollOnAdd;
				break;
			case 'scrollOnRemove': 
				return scrollOnRemove;
				break;
			default: 
				return '';
				break;
		};
	}

	function nebaScrollProcedure (scrollOptions) 
	{
		var scrollElementNames = scrollOptions.scrollElementNames || nebaScrollTag();
		var scrollAddClass = scrollOptions.scrollAddClass || nebaScrollParams('scrollAddClass');
		var scrollOnAdd = scrollOptions.scrollOnAdd || nebaScrollParams('scrollOnAdd');
		var scrollOnRemove = scrollOptions.scrollOnRemove || nebaScrollParams('scrollOnRemove');
		var scrollBottom = $(document).scrollTop() + $(window).height();
		var scrollTop = $(document).scrollTop();
		$.each(scrollElementNames, function (index, scrollElementName) 
		{
			$(scrollElementName).each(function () 
			{
				if ((scrollOptions.isFixed)&&($(this).is('[neba-firstposition]'))) 
				{
					var elementTop = $(this).attr('neba-firstposition');
				}
				else 
				{
					var elementTop = $(this).offset().top;
				}
				if (!scrollOptions.fromTop) 
				{
					if ($(this).length>0) 
					{
						if (elementTop <= scrollBottom - scrollOnAdd) 
						{
							if (scrollOptions.isFixed) $(this).attr('neba-firstposition', elementTop);
							$(this).addClass(scrollAddClass);
						}
						if (elementTop > scrollBottom - scrollOnRemove) 
						{
							if (scrollOptions.isFixed) $(this).removeAttr('neba-firstposition');
							$(this).removeClass(scrollAddClass);
						}
					}
				}
				else 
				{
					if ($(this).length>0) 
					{
						if (elementTop <= scrollTop + scrollOnAdd) 
						{
							if (scrollOptions.isFixed) $(this).attr('neba-firstposition', elementTop);
							$(this).addClass(scrollAddClass);
						}
						if (elementTop > scrollTop + scrollOnRemove) 
						{
							if (scrollOptions.isFixed) $(this).removeAttr('neba-firstposition');
							$(this).removeClass(scrollAddClass);
						}
					}
				}
			});
		});
	}
}


// New addons to CSS-format that have include any customer wishes. If you see this text, 
// please send me any wishes, who can be usable on email: ilya.neba@gmail.com
// For enabling it you need to add "neba-class" attribute to tag.
$(document).ready(function () 
{
	$(window).bind("load", function () 
	{
		nebaCss();
	});
	$(window).bind("resize", function () 
	{
		nebaCss();
	});
	$(window).bind("orientationchange", function () 
	{
		nebaCss();
	});
});

function nebaCss () 
{
	nebaCssProcedure();

	function nebaCssOptionsFormat (rawFormat) 
	{
		var cssFormat = rawFormat.replace(/ /g, '');
		while (cssFormat.charAt(cssFormat.length-1) === ';') cssFormat = cssFormat.substring(0, cssFormat.length-1);
		cssFormat = '{"'+cssFormat.replace(/;/g, '","').replace(/:/g, '":"')+'"}';
		cssFormat = $.parseJSON(cssFormat);
		return cssFormat;
	}

	function nebaOutputFormat (cssObject, bodyWidth, cssFormat) 
	{
		var outputFormat = new Object;
		var outputFormatChild = new Object;
		//Here is rubber position format
		if (cssFormat.position === 'rubber') 
		{
			if (bodyWidth <= cssFormat.nebamaxwidth) 
			{
				if (bodyWidth >= cssFormat.nebaminwidth) 
				{
					outputFormat.width = bodyWidth+'px';
				}
				else 
				{
					outputFormat.width = cssFormat.nebaminwidth+'px';
				}
			}
			else 
			{
				outputFormat.width = cssFormat.nebamaxwidth+'px';
			}
		}
		//Here is parent-adaptive position format
		if (cssFormat.position === 'parentadaptive') 
		{
			if (!cssFormat.parentident) 
			{
				var cssParentObject = cssObject;
				while ($(cssObject).css('width').replace('px', '') >= $(cssParentObject).parent().css('width').replace('px', '')) 
				{
					cssParentObject = $(cssParentObject).parent();
					if ($(cssParentObject).is('body')) break;
				}
				if (!$(cssParentObject).is('body')) 
				{
					cssParentObject = $(cssParentObject).parent();
					outputFormat.marginLeft = (($(cssParentObject).css('width').replace('px', '') - $(cssObject).css('width').replace('px', ''))/2)+'px';
				}
				else 
				{
					outputFormat.marginLeft = '0px';
				}
			}
			else 
			{
				var cssParentObject = $(cssFormat.parentident);
				if (!cssFormat.nebamaxwidth) 
				{
					if (($(cssObject).css('width').replace('px', ''))<($(cssParentObject).css('width').replace('px', ''))) 
					{
						outputFormat.marginLeft = '0px';
					}
					else 
					{
						outputFormat.marginLeft = (($(cssParentObject).css('width').replace('px', '') - $(cssObject).css('width').replace('px', ''))/2)+'px';
					}
				}
				else 
				{
					if (bodyWidth >= cssFormat.nebamaxwidth) 
					{
						outputFormat.marginLeft = '0px';
					}
					else 
					{
						if (bodyWidth <= cssFormat.nebaminwidth) 
						{
							outputFormat.marginLeft = ((cssFormat.nebaminwidth-cssFormat.nebamaxwidth)/2)+'px';
						}
						else 
						{
							outputFormat.marginLeft = (($(cssParentObject).css('width').replace('px', '') - $(cssObject).css('width').replace('px', ''))/2)+'px';
						}
					}
				}
			}
		}
		return outputFormat;
	}

	function nebaCssProcedure () 
	{
		var bodyWidth = document.body.clientWidth;
		var attribName = '[neba-class]';
		var attribNameMini = attribName.replace('[', '').replace(']', '');
		if ((bodyWidth)&&($(attribName).length>0)) 
		{
			$(attribName).each(function () 
			{
				var cssFormat = nebaCssOptionsFormat($(this).attr(attribNameMini));
				var outputFormat = new Object;
				outputFormat = nebaOutputFormat(this, bodyWidth, cssFormat);
				//Self properties
				$(this).css(outputFormat);
				//Child properties
				if (typeof cssFormat.childwidth !== 'undefined') $(this).children().css('width', cssFormat.childwidth);
			});
		}
		else 
		{
			window.setTimeout(nebaCssProcedure, 30);
		}
	}
}