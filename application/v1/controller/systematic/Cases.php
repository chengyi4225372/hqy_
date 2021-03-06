<?php
/**
 * 案例管理.
 * User: abc
 * Date: 2019/7/25
 * Time: 14:06
 */
namespace app\v1\controller\systematic;
use app\common\controller\AuthController;
use app\v1\service\Caseservice;
use think\Config;
class Cases extends AuthController
{
    /**
     * @DESC：成功案例首页
     * @author: jason
     * @date: 2019-10-21 07:01:33
     */
    public function index()
    {
        $params = $_GET;
        $return_data = Caseservice::instance()->getparentlist($params);
//        echo '<pre>';print_r($return_data);exit;
        $status = Config::get('site.case');
        $is_show = Config::get('site.is_show');
        $this->assign('is_show',$is_show);
        $this->assign('status',$status);
        $this->assign('data',$return_data);
        $this->assign('title','最新案例');
        return $this->fetch();
    }

    /**
     * @DESC：添加主案例
     * @return mixed
     * @author: jason
     * @date: 2019-10-21 08:30:58
     */
    public function addcase()
    {
        if($this->request->isAjax() && $this->request->isPost()){
            return Caseservice::instance()->addcase($_POST);
        }
        $status = Config::get('site.case');
        $is_show = Config::get('site.is_show');
        $this->assign('is_show',$is_show);
        $this->assign('status',$status);
        return $this->fetch();
    }

    /**
     * @DESC：编辑主案例
     * @author: jason
     * @date: 2019-10-21 09:19:18
     */
    public function editcase()
    {
        if($this->request->isAjax() && $this->request->isPost()){
            $data = Caseservice::instance()->editcase($_POST);
            return $data;
        }
        $id = $_GET['id'];
        $return_data = Caseservice::instance()->getcaselist($id);

        $status = Config::get('site.case');
        $is_show = Config::get('site.is_show');
        $this->assign('is_show',$is_show);
        $this->assign('data',$return_data);
        $this->assign('status',$status);
        return $this->fetch();
    }

    /**
     * @DESC：文案改变状态
     * @return \think\response\Json
     * @author: jason
     * @date: 2019-12-05 01:34:01
     */
    public function casestatus()
    {
        if($this->request->isAjax() && $this->request->isPost()){
            $return_data = Caseservice::instance()->casestatus($_POST);
            if($return_data == false){
                return json(['status' => 400,'msg' => '请确认操作是否正确']);
            }
            return json(['status' => 200,'msg' => '操作成功']);
        }
    }

    /**
     * @DESC：文案排序
     * @return \think\response\Json
     * @author: jason
     * @date: 2019-12-05 02:25:19
     */
    public function changesort()
    {
        if($this->request->isAjax() && $this->request->isPost()){
            $return_data = Caseservice::instance()->changesort($_POST);
            if($return_data == false){
                return json(['status' => 400,'msg' => '请确认操作是否正确']);
            }
            return json(['status' => 200,'msg' => '排序成功']);
        }
    }
}