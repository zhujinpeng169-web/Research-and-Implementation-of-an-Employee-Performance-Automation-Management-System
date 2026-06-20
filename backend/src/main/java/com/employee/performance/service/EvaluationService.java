// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.service;


// 行注释：导入实体类，对应数据库中的业务表。
import com.employee.performance.entity.Evaluation;
// 行注释：导入数据访问接口，用于调用数据库操作。
import com.employee.performance.repository.EvaluationRepository;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.RequiredArgsConstructor;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.stereotype.Service;
// 行注释：导入当前类需要使用的外部类型或工具。
import java.math.BigDecimal;
// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.LocalDateTime;
// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.List;

// 行注释：声明这是业务服务层组件，由 Spring 容器管理。
@Service
// 行注释：让 Lombok 自动生成 final 字段构造器，便于依赖注入。
@RequiredArgsConstructor
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
// 类注释：这是 EvaluationService 模块的业务服务类，用于承载核心业务逻辑并协调数据读写。
public class EvaluationService {
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final EvaluationRepository evaluationRepository;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final AlertService alertService;

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：业务层查询全部数据时使用，通常由列表页面或下拉选择调用。
    public List<Evaluation> getAllEvaluations() {
        // 行注释：返回当前方法的处理结果。
        return evaluationRepository.findAll();
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    public Evaluation getEvaluationById(Long id) {
        // 行注释：返回当前方法的处理结果。
        return evaluationRepository.findById(id).orElse(null);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层新增或保存数据时使用，负责把前端提交的业务对象持久化。
    public Evaluation createEvaluation(Evaluation evaluation) {
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        evaluation.setCreatedAt(LocalDateTime.now());
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        evaluation.setUpdatedAt(LocalDateTime.now());
        // 行注释：返回当前方法的处理结果。
        return evaluationRepository.save(evaluation);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层修改业务状态或内容时使用，负责校验已有数据并保存更新结果。
    public Evaluation updateEvaluation(Long id, Evaluation evaluation) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        Evaluation existing = getEvaluationById(id);
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (existing != null) {
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setSelfScore(evaluation.getSelfScore());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setSupervisorScore(evaluation.getSupervisorScore());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setPeerScore(evaluation.getPeerScore());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setSelfComment(evaluation.getSelfComment());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setSupervisorComment(evaluation.getSupervisorComment());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setStatus(evaluation.getStatus());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setUpdatedAt(LocalDateTime.now());

            // 行注释：当前行参与完成该模块的业务逻辑。
            BigDecimal finalScore = calculateFinalScore(
                // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                evaluation.getSelfScore(),
                // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                evaluation.getSupervisorScore(),
                // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                evaluation.getPeerScore()
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            );
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setFinalScore(finalScore);

            // 行注释：返回当前方法的处理结果。
            return evaluationRepository.save(existing);
        // 行注释：结束当前代码块。
        }
        // 行注释：返回当前方法的处理结果。
        return null;
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    private BigDecimal calculateFinalScore(BigDecimal selfScore, BigDecimal supervisorScore, BigDecimal peerScore) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        BigDecimal total = BigDecimal.ZERO;
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (selfScore != null) total = total.add(selfScore.multiply(new BigDecimal("0.2")));
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (supervisorScore != null) total = total.add(supervisorScore.multiply(new BigDecimal("0.6")));
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (peerScore != null) total = total.add(peerScore.multiply(new BigDecimal("0.2")));
        // 行注释：返回当前方法的处理结果。
        return total;
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：业务层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public List<Evaluation> getEvaluationsByEmployee(Long employeeId) {
        // 行注释：返回当前方法的处理结果。
        return evaluationRepository.findByEmployeeId(employeeId);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    public void deleteEvaluation(Long id) {
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (evaluationRepository.existsById(id)) {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            evaluationRepository.deleteById(id);
        // 行注释：结束当前代码块。
        }
    // 行注释：结束当前代码块。
    }

    /**
     * 检查待评估项并创建预警
     */
    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：业务层执行业务检查并生成提醒，用于发现目标、任务或评估中的风险。
    public void checkPendingEvaluationAlerts() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        List<Evaluation> evaluations = evaluationRepository.findAll();

        // 行注释：遍历集合数据，逐条处理业务记录。
        for (Evaluation evaluation : evaluations) {
            // 行注释：进行条件判断，根据业务状态决定后续处理分支。
            if ("pending".equals(evaluation.getStatus())) {
                // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                LocalDateTime createdAt = evaluation.getCreatedAt();
                // 行注释：进行条件判断，根据业务状态决定后续处理分支。
                if (createdAt != null) {
                    // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                    long daysPending = java.time.Duration.between(createdAt, LocalDateTime.now()).toDays();

                    // 行注释：进行条件判断，根据业务状态决定后续处理分支。
                    if (daysPending >= 7) {
                        // 行注释：当前行参与完成该模块的业务逻辑。
                        alertService.createAlert(
                            // 行注释：当前行参与完成该模块的业务逻辑。
                            "evaluation_pending",
                            // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                            evaluation.getId(),
                            // 行注释：当前行参与完成该模块的业务逻辑。
                            "evaluation",
                            // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                            "评估记录（员工ID:" + evaluation.getEmployeeId() + "）已待评估" + daysPending + "天，请尽快完成"
                        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                        );
                    // 行注释：结束当前代码块。
                    }
                // 行注释：结束当前代码块。
                }
            // 行注释：结束当前代码块。
            }

            // 行注释：进行条件判断，根据业务状态决定后续处理分支。
            if (evaluation.getFinalScore() != null) {
                // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                BigDecimal score = evaluation.getFinalScore();
                // 行注释：进行条件判断，根据业务状态决定后续处理分支。
                if (score.compareTo(new BigDecimal("30")) < 0) {
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    alertService.createAlert(
                        // 行注释：当前行参与完成该模块的业务逻辑。
                        "abnormal_data",
                        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                        evaluation.getId(),
                        // 行注释：当前行参与完成该模块的业务逻辑。
                        "evaluation",
                        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                        "员工ID:" + evaluation.getEmployeeId() + " 的评估得分异常偏低（" + score + "分），建议人工审核"
                    // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                    );
                // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
                } else if (score.compareTo(new BigDecimal("95")) > 0) {
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    alertService.createAlert(
                        // 行注释：当前行参与完成该模块的业务逻辑。
                        "abnormal_data",
                        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                        evaluation.getId(),
                        // 行注释：当前行参与完成该模块的业务逻辑。
                        "evaluation",
                        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                        "员工ID:" + evaluation.getEmployeeId() + " 的评估得分异常偏高（" + score + "分），建议人工审核"
                    // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                    );
                // 行注释：结束当前代码块。
                }
            // 行注释：结束当前代码块。
            }
        // 行注释：结束当前代码块。
        }
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}


