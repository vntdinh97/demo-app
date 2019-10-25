import React, {Component} from 'react';

export default class Post extends Component {
    render() {
        return (
            <div class="card border rounded-0">
                    <div class="card-header" style="background-color: rgba(0,0,0,0);height: 60px;">
                        <div class="float-left d-xl-flex align-items-xl-center"><img class="float-left rounded-circle" src="assets/img/karankhandekarBS.jpg" style="width: 35px;margin-right: 10px;"/>
                            <div class="float-left">
                                <h6 class="mb-0" style="margin: 0px;margin-right: 20px;">Nguyễn Văn A</h6><label class="float-left" style="font-size: 14px;margin-bottom: 0px;">Chuyên viên - Phòng QTDN</label></div>
                        </div><i class="fa fa-ellipsis-h float-right" style="font-size: 20px;"></i></div>
                    <div class="card-body" style="padding-bottom: 0px;">
                        <div class="d-xl-flex align-items-xl-center" style="width: 100%;">
                            <p class="float-left"><br/>The&nbsp;.disabled&nbsp;class uses&nbsp;pointer-events: none&nbsp;to try to disable the link functionality of&nbsp;&lt;a&gt;s, but that CSS property is not yet standardized. In addition, even in browsers that do support&nbsp;pointer-events:
                                none, keyboard navigation remains unaffected, meaning that sighted keyboard users and users of assistive technologies will still be able to activate these links. So to be safe, add a&nbsp;tabindex="-1"&nbsp;attribute on
                                these links (to prevent them from receiving keyboard focus) and use custom JavaScript to disable their functionality.<br/><br/></p>
                        </div>
                        <div class="row" style="width: 100%;">
                            <div class="col"><a class="float-left" href="#" style="color: #606770;"><i class="fa fa-hand-o-up"></i>&nbsp;Bạn và 6 người khác</a></div>
                            <div class="col"><a class="float-right" href="#" style="color: #606770;">&nbsp;13 bình luận</a><a class="float-right" href="#" style="margin-right: 10px;color: #606770;">&nbsp;9 lượt chia sẻ</a></div>
                        </div>
                        <div class="row" style="border-top: 1px solid  #E9EBEE;padding-top: 10px;margin-top: 10px;font-weight: 600;font-size: 13px;font-family: inherit;margin-bottom: 10px;">
                            <div class="col d-xl-flex justify-content-xl-center"><a href="#"><i class="fa fa-hand-o-up" style="font-size: 20px;"></i>&nbsp; Thích</a></div>
                            <div class="col d-xl-flex justify-content-xl-center"><a href="#"><i class="fa fa-comments-o" style="font-size: 20px;"></i>&nbsp; Chia sẻ</a></div>
                            <div class="col d-xl-flex justify-content-xl-center"><a href="#"><i class="fa fa-share-square-o" style="font-size: 20px;"></i>&nbsp; Bình Luận</a></div>
                        </div>
                    </div>
                    <div style="border-top: 1px solid  #E9EBEE;width: 100%;padding: 10px;">
                        <div><img class="float-left rounded-circle" src="assets/img/karankhandekarBS.jpg" style="width: 35px;margin-right: 10px;"/>
                            <div class="float-left">
                                <div class="d-xl-flex align-items-xl-center" style="background-color: #e9ebee;border-radius: 25px;padding-right: 10px;padding-left: 10px;font-size: 13px;padding-top: 5px;padding-bottom: 5px;"><a href="#" style="font-weight: bold;color: #385898;">Nguyễn Xuân Khải</a><label class="d-xl-flex" style="margin-left: 5px;margin-bottom: 0px;">viết cái gì đấy!</label></div>
                                <div style="margin-left: 10px;font-size: 12px;"><a href="#">Thích</a><label>&nbsp;-&nbsp;</label><a href="#">Trả lời</a><label>&nbsp;-&nbsp;</label><a href="#">2 giờ</a></div>
                                <div style="width: 100%;padding: 10px;">
                                    <div><img class="float-left rounded-circle" src="assets/img/karankhandekarBS.jpg" style="width: 35px;margin-right: 10px;"/>
                                        <div class="float-left">
                                            <div class="d-xl-flex align-items-xl-center" style="background-color: #e9ebee;border-radius: 25px;padding-right: 10px;padding-left: 10px;font-size: 13px;padding-top: 5px;padding-bottom: 5px;"><a href="#" style="font-weight: bold;color: #385898;">Văn Tuấn Hưng</a><label style="margin-left: 5px;margin-bottom: 0px;">viết cái gì đấy!</label></div>
                                            <div style="margin-left: 10px;font-size: 12px;"><a href="#">Thích</a><label>&nbsp;-&nbsp;</label><a href="#">Trả lời</a><label>&nbsp;-&nbsp;</label><a href="#">2 giờ</a></div>
                                        </div>
                                    </div>
                                </div>
                                <div style="width: 100%;padding: 10px;">
                                    <div><img class="float-left rounded-circle" src="assets/img/karankhandekarBS.jpg" style="width: 35px;margin-right: 10px;"/>
                                        <div class="float-left">
                                            <div class="d-xl-flex align-items-xl-center" style="background-color: #e9ebee;border-radius: 25px;padding-right: 10px;padding-left: 10px;font-size: 13px;padding-top: 5px;padding-bottom: 5px;"><a href="#" style="font-weight: bold;color: #385898;">Văn Tuấn Hưng</a><label style="margin-left: 5px;margin-bottom: 0px;">viết cái gì đấy!</label></div>
                                            <div style="margin-left: 10px;font-size: 12px;"><a href="#">Thích</a><label>&nbsp;-&nbsp;</label><a href="#">Trả lời</a><label>&nbsp;-&nbsp;</label><a href="#">2 giờ</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}