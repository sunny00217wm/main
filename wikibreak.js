$(document).ready(function() {
	var jspage = '//raw.githubusercontent.com/sunny00217wm/main/master/wikibreak.js'

	mw.messages.set({
		'year': '',
		'month': '',
		'day': '',
		'hour': '',
		'minute': '',
		'second': ''
	})

	/**
	$.ajax( {
		url: '/w/index.php',
		dataType: 'script',
		data: {
			title: 'User:' + mw.config.get('wgUserName') + '/wikibreaksetting.js',
			action: 'raw',
			ctype: 'text/javascript',
		},
	} );
	**/
	mw.loader.load( '/w/index.php?title=User:' + mw.config.get('wgUserName') + '/wikibreaksetting.js&action=raw&ctype=text/javascript' );

    var api = new mw.Api();

	var portletLink = mw.util.addPortletLink('p-tb', '#', wgULS('设定维基假期','設定维基假期'), 't-wikibreaksetting', wgULS('设定维基假期','設定维基假期'));

	$(portletLink).click(settingbox ())

	function settingbox () {
        mw.loader.using(['jquery.ui'], function() {
		    var html = '<div class="mw-parser-output">'
			html += '<h3>' + wgULS('维基假期结束时间','维基假期結束時間') + '</h3>'
		    html += '年分<br /><input type="text" id="year" size="40">' + mw.msg('year') + '</input>'
		    html += '<p class="mw-empty-elt"></p><table cellspacing="0" cellpadding="0" class="multicol" style="background:transparent; width:100%;">'
		    html += '<tbody><tr>'
		    html += '<td width="33%" align="left" valign="top">'
		    html += '<p>月份<br /><input type="text" id="month" size="40">' + mw.msg('month') + '</input>'
		    html += '</p>'
		    html += '<p class="mw-empty-elt"></p>'
		    html += '</td>'
		    html += '<td width="33%" align="left" valign="top">'
		    html += '<p>日期<br /><input type="text" id="day" size="40">' + mw.msg('day') + '</input>'
		    html += '</p>'
		    html += '<p class="mw-empty-elt"></p>'
		    html += '</td>'
		    html += '<td width="33%" align="left" valign="top">'
		    html += '<p class="mw-empty-elt"></p>'
		    html += '</td>'
		    html += '<td style="text-align: left; vertical-align: top;">'
		    html += '<p>時<br /><input type="text" id="hour" size="40">' + mw.msg('hour') + '</input>'
		    html += '</p>'
		    html += '<p class="mw-empty-elt"></p>'
		    html += '</td>'
		    html += '<td width="33%" align="left" valign="top">'
		    html += '<p>分<br /><input type="text" id="minute" size="40">' + mw.msg('minute') + '</input>'
		    html += '</p>'
		    html += '<p class="mw-empty-elt"></p>'
		    html += '</td>'
		    html += '<td width="33%" align="left" valign="top">'
		    html += '<p>秒<br /><input type="text" id="second" size="40">' + mw.msg('second') + '</input>'
		    html += '</p>'
		    html += '<p class="mw-empty-elt"></p>'
		    html += '</td>'
		    html += '<td width="33%" align="left" valign="top">'
		    html += '<p class="mw-empty-elt"></p>'
		    html += '</td></tr></tbody></table>'
            $(html).dialog({
                title: wgULS('设定维基假期','設定维基假期'),
                minWidth: 515,
                minHeight: 150,
                buttons: [{
                    text: '確定',
                    click: function() {
                        if (
						    $(this).find('#year').val().trim() !== ''
							&& $(this).find('#month').val().trim() !== ''
							&& $(this).find('#day').val().trim() !== ''
							&& $(this).find('#hour').val().trim() !== ''
							&& $(this).find('#minute').val().trim() !== ''
							&& $(this).find('#second').val().trim() !== ''
						) {
						    mw.messages.set({
							    'year': $(this).find('#year').val().trim(),
								'month': $(this).find('#month').val().trim().replace( /^0(\d)$/, '$1' ),
								'day': $(this).find('#day').val().trim().replace( /^0(\d)$/, '$1' ),
								'hour': $(this).find('#hour').val().trim().replace( /^0(\d)$/, '$1' ),
								'minute': $(this).find('#minute').val().trim().replace( /^0(\d)$/, '$1' ),
								'second': $(this).find('#second').val().trim().replace( /^0(\d)$/, '$1' )
							})
                            settingwikibreak();
							$(this).dialog('close');
                        } else {
                            mw.notify('缺乏參數');
                        }
                    }
                }, {
                    text: '取消',
                    click: function() {
                        $(this).dialog('close');
                    }
                }]
            });
        });
    }

	function settingwikibreak(){
	    var newtext = `
// <nowiki>
/**
wikibreaksetting.js：${ wgULS('维基假期设定', '維基假期設定') }

註：${ wgULS('修改您的设定最简单的办法是使用工具栏的设定维基假期', '修改您的設定最簡單的辦法是使用工具欄的設定維基假期') }

${ wgULS('这个文件是自动产生的，您所做的任何修改（除了以合法的mwmessage来修改这些属性值）会在下一次您储存时被覆盖', '這個檔案是自動產生的，您所做的任何修改（除了以合法的mwmessage來修改這些屬性值）會在下一次您儲存時被覆蓋') }。

修改方式：

year是完整年分（20xx），month是月份，day是日期，hour是${ wgULS('时', '時') }，minute是分，second是秒。

${ wgULS('没有前导零，如 7 ~ 正确，但是 07 ~ 错误', '沒有前導零，如 7 ~ 正確，但是 07 ~ 錯誤') }。

${ wgULS('时间是以本地时间做计算', '時間是以本地時間做計算') }。

**/
/*global mw:false*/
mw.messages.set({
	'year': ${ mw.msg('year') },
	'month': ${ mw.msg('month') },
	'day': ${ mw.msg('day') },
	'hour': ${ mw.msg('hour') },
	'minute': ${ mw.msg('minute') },
	'second': ${ mw.msg('second') }
})
	    `
	    new mw.Api().edit( 'User:' + mw.config.get('wgUserName') + '/wikibreaksetting.js',
		    {
				summary: '設定維基假期 via ' + jspage,
				text: newtext,
				token: mw.user.tokens.get('csrfToken'),
				minor: true
            };
		).then(function() {
            mw.notify('已' + wgULS('储存设定', '儲存設定') + '成功');
        }, function(e) {
            mw.notify(wgULS('储存设定时发生未知错误', '儲存設定時發生未知錯誤') + ' ：' + e);
        });
	}

	function add_leading_zero (number){
		if (number < 10) {
			number = '0' + number;
		}
		return number;
	}

	var day_names = new Array('日', '一', '二', '三', '四', '五', '六');

	function getfulltime (){
		return now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 (' + day_names[now.getDay()] + ') ' + add_leading_zero(parseInt(now.getHours())) + ':' +  add_leading_zero(now.getMinutes()) + ' (UTC+8)';
	}

	function getfullendtime (){
		return now.getFullYear() + '年' + (end.getMonth() + 1) + '月' + end.getDate() + '日 (' + day_names[end.getDay()] + ') ' + add_leading_zero(parseInt(end.getHours())) + ':' +  add_leading_zero(end.getMinutes()) + ' (UTC+8)';
	}

	if (
		mw.msg('year') !== ''
		&& mw.msg('month') !== ''
		&& mw.msg('day') !== ''
		&& mw.msg('hour') !== ''
		&& mw.msg('minute') !== ''
		&& mw.msg('second') !== ''
	){
	    var now = new Date();
	    var end = new Date(mw.msg('year'), mw.msg('month'), mw.msg('day'), mw.msg('hour'), mw.msg('minute'), mw.msg('second'));
		if (now < end) {
			alert(wgULS("您的维基假期将在","您的維基假期將在") + getfullendtime() + wgULS("结束","結束")
			+ "\n（" + wgULS("现在是","現在是") + "：" + getfulltime() + "）\n\n" + wgULS("再见","再見") + '！');
			mw.loader.using(["mediawiki.api", "mediawiki.user"]).then(function (){
			    new mw.Api().post({
				    action: 'logout',
				    token: mw.user.tokens.get('csrfToken')
			    }).fail(function () {
				    mw.notify("嘗試自動登出失敗")
			    });
			});
		    window.location = "/w/index.php?title=Special:Userlogout&returnto=" + mw.config.get('wgPageName') ;
		}
	}
});
